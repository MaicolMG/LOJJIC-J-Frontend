package com.sigid.logistica.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.models.Producto
import com.sigid.logistica.data.models.ProductoCarrito
import com.sigid.logistica.data.repository.SigidRepository
import kotlinx.coroutines.launch

class ProductosViewModel : ViewModel() {
    
    private val repository = SigidRepository()
    
    private val _productos = MutableLiveData<List<Producto>>()
    val productos: LiveData<List<Producto>> = _productos
    
    private val _carrito = MutableLiveData<MutableList<ProductoCarrito>>(mutableListOf())
    val carrito: LiveData<MutableList<ProductoCarrito>> = _carrito
    
    fun loadProductos() {
        viewModelScope.launch {
            val result = repository.getProductos()
            _productos.postValue(result)
        }
    }
    
    fun agregarAlCarrito(producto: Producto) {
        val currentCarrito = _carrito.value ?: mutableListOf()
        val existe = currentCarrito.find { it.producto.id == producto.id }
        
        if (existe != null) {
            existe.cantidad++
        } else {
            currentCarrito.add(ProductoCarrito(producto))
        }
        
        _carrito.postValue(currentCarrito)
    }
    
    fun eliminarDelCarrito(tempId: String) {
        val currentCarrito = _carrito.value ?: mutableListOf()
        currentCarrito.removeAll { it.tempId == tempId }
        _carrito.postValue(currentCarrito)
    }
    
    fun vaciarCarrito() {
        _carrito.postValue(mutableListOf())
    }
    
    fun getTotalCarrito(): Double {
        return _carrito.value?.sumOf { it.producto.precio * it.cantidad } ?: 0.0
    }
}
