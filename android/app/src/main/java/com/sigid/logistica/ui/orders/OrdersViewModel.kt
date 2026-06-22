package com.sigid.logistica.ui.orders

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.api.ApiClient
import com.sigid.logistica.data.api.OrdenService
import com.sigid.logistica.data.model.Orden
import com.sigid.logistica.data.model.OrdenesResponse
import kotlinx.coroutines.launch

class OrdersViewModel : ViewModel() {
    private val ordenService: OrdenService = ApiClient.createOrdenService()
    
    private val _orders = MutableLiveData<List<Orden>>()
    val orders: LiveData<List<Orden>> = _orders
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String>()
    val error: LiveData<String> = _error
    
    fun loadOrders() {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val response = ordenService.getOrdenes()
                if (response.isSuccessful && response.body() != null) {
                    val ordersResponse = response.body()!!
                    if (ordersResponse.success) {
                        _orders.value = ordersResponse.ordenes
                    } else {
                        _error.value = ordersResponse.message ?: "Error al cargar órdenes"
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
    
    fun markAsDelivered(orderId: String) {
        _isLoading.value = true
        viewModelScope.launch {
            try {
                val response = ordenService.marcarEntregada(orderId)
                if (response.isSuccessful && response.body() != null) {
                    val ordenResponse = response.body()!!
                    if (ordenResponse.success) {
                        loadOrders() // Recargar lista actualizada
                    } else {
                        _error.value = ordenResponse.message ?: "Error al marcar como entregada"
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
