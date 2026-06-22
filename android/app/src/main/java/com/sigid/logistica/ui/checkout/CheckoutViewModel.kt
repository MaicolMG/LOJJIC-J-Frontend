package com.sigid.logistica.ui.checkout

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.api.ApiClient
import com.sigid.logistica.data.api.OrdenService
import com.sigid.logistica.data.api.ProductService
import com.sigid.logistica.data.model.CreateOrdenRequest
import com.sigid.logistica.data.model.OrderItem
import com.sigid.logistica.data.model.OrdenResponse
import com.sigid.logistica.data.model.Product
import com.sigid.logistica.data.model.ProductsResponse
import kotlinx.coroutines.launch

class CheckoutViewModel : ViewModel() {
    private val ordenService: OrdenService = ApiClient.createOrdenService()
    private val productService: ProductService = ApiClient.createProductService()
    
    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> = _products
    
    private val _cartItems = MutableLiveData<MutableList<OrderItem>>()
    val cartItems: LiveData<MutableList<OrderItem>> = _cartItems
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String>()
    val error: LiveData<String> = _error
    
    private val _orderCreated = MutableLiveData<Boolean>()
    val orderCreated: LiveData<Boolean> = _orderCreated
    
    init {
        _cartItems.value = mutableListOf()
        loadProducts()
    }
    
    fun loadProducts() {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val response = productService.getProductos()
                if (response.isSuccessful && response.body() != null) {
                    val productsResponse = response.body()!!
                    if (productsResponse.success) {
                        _products.value = productsResponse.productos
                    }
                }
            } catch (e: Exception) {
                _error.value = "Error de red: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    fun addToCart(product: Product) {
        val currentCart = _cartItems.value ?: mutableListOf()
        val existingItem = currentCart.find { it.productoId == product.id }
        
        if (existingItem != null) {
            _error.value = "El producto ya está en el carrito"
        } else {
            val orderItem = OrderItem(
                productoId = product.id,
                nombre = product.nombre,
                precio = product.precio
            )
            currentCart.add(orderItem)
            _cartItems.value = currentCart
        }
    }
    
    fun removeFromCart(position: Int) {
        val currentCart = _cartItems.value ?: mutableListOf()
        if (position < currentCart.size) {
            currentCart.removeAt(position)
            _cartItems.value = currentCart
        }
    }
    
    fun getTotal(): Double {
        return _cartItems.value?.sumOf { it.precio } ?: 0.0
    }
    
    fun createOrder(sede: String, metodoPago: String, destinatario: String?) {
        val cart = _cartItems.value
        if (cart.isNullOrEmpty()) {
            _error.value = "El carrito está vacío"
            return
        }
        
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val request = CreateOrdenRequest(
                    items = cart,
                    sede = sede,
                    metodoPago = metodoPago,
                    destinatario = destinatario
                )
                
                val response = ordenService.crearOrden(request)
                if (response.isSuccessful && response.body() != null) {
                    val ordenResponse = response.body()!!
                    if (ordenResponse.success) {
                        _orderCreated.value = true
                        _cartItems.value = mutableListOf() // Limpiar carrito
                    } else {
                        _error.value = ordenResponse.message ?: "Error al crear la orden"
                    }
                } else {
                    _error.value = "Error de conexión con el servidor"
                }
            } catch (e: Exception) {
                _error.value = "Error de red: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
}
