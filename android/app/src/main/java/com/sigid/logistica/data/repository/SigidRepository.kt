package com.sigid.logistica.data.repository

import com.sigid.logistica.data.api.RetrofitClient
import com.sigid.logistica.data.models.*

class SigidRepository {
    
    private val api = RetrofitClient.apiService
    
    suspend fun login(email: String, password: String): LoginResponse? {
        return try {
            val response = api.login(LoginRequest(email, password))
            if (response.isSuccessful) response.body() else null
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun verifyMFA(email: String, code: String): LoginResponse? {
        return try {
            val response = api.verifyMFA(MFARequest(email, code))
            if (response.isSuccessful) response.body() else null
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun getProductos(): List<Producto> {
        return try {
            val response = api.getProductos()
            if (response.isSuccessful) response.body() ?: emptyList() else emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    suspend fun crearGuia(items: List<Int>, sede: String, metodoPago: String): Guia? {
        return try {
            val response = api.crearGuia(GuiaRequest(items, sede, metodoPago))
            if (response.isSuccessful) response.body() else null
        } catch (e: Exception) {
            null
        }
    }
    
    suspend fun getGuias(): List<Guia> {
        return try {
            val response = api.getGuias()
            if (response.isSuccessful) response.body() ?: emptyList() else emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    suspend fun getStock(): List<Producto> {
        return try {
            val response = api.getStock()
            if (response.isSuccessful) response.body() ?: emptyList() else emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
}
