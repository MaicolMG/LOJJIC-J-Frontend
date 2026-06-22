package com.sigid.logistica.data.api

import com.sigid.logistica.data.model.Product
import com.sigid.logistica.data.model.ProductRequest
import com.sigid.logistica.data.model.ProductsResponse
import com.sigid.logistica.data.model.ProductResponse
import com.sigid.logistica.data.model.StockAdjustRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ProductService {
    @GET("api/productos")
    suspend fun getProductos(
        @Query("categoria") categoria: String? = null,
        @Query("search") search: String? = null,
        @Query("minStock") minStock: Int? = null
    ): Response<ProductsResponse>
    
    @GET("api/productos/{id}")
    suspend fun getProductoById(@Path("id") id: String): Response<ProductResponse>
    
    @POST("api/productos")
    suspend fun crearProducto(@Body request: ProductRequest): Response<ProductResponse>
    
    @PUT("api/productos/{id}")
    suspend fun actualizarProducto(
        @Path("id") id: String,
        @Body request: ProductRequest
    ): Response<ProductResponse>
    
    @DELETE("api/productos/{id}")
    suspend fun eliminarProducto(@Path("id") id: String): Response<ProductResponse>
    
    @PATCH("api/productos/{id}/stock")
    suspend fun ajustarStock(
        @Path("id") id: String,
        @Body request: StockAdjustRequest
    ): Response<ProductResponse>
}
