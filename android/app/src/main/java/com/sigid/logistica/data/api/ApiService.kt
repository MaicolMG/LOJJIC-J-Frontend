package com.sigid.logistica.data.api

import com.sigid.logistica.data.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @POST("api/auth/verify-mfa")
    suspend fun verifyMFA(@Body request: MFARequest): Response<LoginResponse>
    
    @GET("api/productos")
    suspend fun getProductos(): Response<List<Producto>>
    
    @GET("api/productos/{id}")
    suspend fun getProducto(@Path("id") id: Int): Response<Producto>
    
    @POST("api/guias/crear")
    suspend fun crearGuia(@Body request: GuiaRequest): Response<Guia>
    
    @GET("api/guias")
    suspend fun getGuias(): Response<List<Guia>>
    
    @GET("api/inventario/stock")
    suspend fun getStock(): Response<List<Producto>>
}
