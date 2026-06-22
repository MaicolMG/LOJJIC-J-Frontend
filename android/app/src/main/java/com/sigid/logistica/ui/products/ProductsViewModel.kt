package com.sigid.logistica.ui.products

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.api.ApiClient
import com.sigid.logistica.data.api.ProductService
import com.sigid.logistica.data.model.Product
import com.sigid.logistica.data.model.ProductsResponse
import kotlinx.coroutines.launch

class ProductsViewModel : ViewModel() {
    private val productService: ProductService = ApiClient.createProductService()
    
    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> = _products
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String>()
    val error: LiveData<String> = _error
    
    fun loadProducts() {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val response = productService.getProductos()
                if (response.isSuccessful && response.body() != null) {
                    val productsResponse = response.body()!!
                    if (productsResponse.success) {
                        _products.value = productsResponse.productos
                    } else {
                        _error.value = productsResponse.message ?: "Error al cargar productos"
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
    
    fun searchProducts(query: String) {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val response = productService.getProductos(search = query)
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
}
