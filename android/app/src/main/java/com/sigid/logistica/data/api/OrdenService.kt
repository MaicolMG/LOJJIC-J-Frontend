package com.sigid.logistica.data.api

import com.sigid.logistica.data.model.AssignOrdenRequest
import com.sigid.logistica.data.model.CreateOrdenRequest
import com.sigid.logistica.data.model.Orden
import com.sigid.logistica.data.model.OrdenResponse
import com.sigid.logistica.data.model.OrdenesResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface OrdenService {
    @GET("api/ordenes")
    suspend fun getOrdenes(
        @Query("estado") estado: String? = null,
        @Query("empleado") empleado: String? = null
    ): Response<OrdenesResponse>
    
    @GET("api/ordenes/{id}")
    suspend fun getOrdenById(@Path("id") id: String): Response<OrdenResponse>
    
    @POST("api/ordenes")
    suspend fun crearOrden(@Body request: CreateOrdenRequest): Response<OrdenResponse>
    
    @PATCH("api/ordenes/{id}/asignar")
    suspend fun asignarOrden(
        @Path("id") id: String,
        @Body request: AssignOrdenRequest
    ): Response<OrdenResponse>
    
    @PATCH("api/ordenes/{id}/entregar")
    suspend fun marcarEntregada(@Path("id") id: String): Response<OrdenResponse>
}
