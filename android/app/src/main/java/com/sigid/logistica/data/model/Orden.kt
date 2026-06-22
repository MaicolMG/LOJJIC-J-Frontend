package com.sigid.logistica.data.model

import com.google.gson.annotations.SerializedName

data class Orden(
    @SerializedName("_id")
    val id: String,
    
    @SerializedName("id_guia")
    val idGuia: String,
    
    @SerializedName("items")
    val items: List<OrderItem>,
    
    @SerializedName("sede")
    val sede: String,
    
    @SerializedName("metodoPago")
    val metodoPago: String,
    
    @SerializedName("destinatario")
    val destinatario: String?,
    
    @SerializedName("valor_declarado")
    val valorDeclarado: Double,
    
    @SerializedName("estado")
    val estado: String,
    
    @SerializedName("empleadoAsignado")
    val empleadoAsignado: String?,
    
    @SerializedName("fechaEntrega")
    val fechaEntrega: String?,
    
    @SerializedName("createdAt")
    val createdAt: String?
)

data class OrderItem(
    @SerializedName("productoId")
    val productoId: String,
    
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("precio")
    val precio: Double
)

data class CreateOrdenRequest(
    @SerializedName("items")
    val items: List<OrderItem>,
    
    @SerializedName("sede")
    val sede: String,
    
    @SerializedName("metodoPago")
    val metodoPago: String,
    
    @SerializedName("destinatario")
    val destinatario: String?
)

data class AssignOrdenRequest(
    @SerializedName("empleadoAsignado")
    val empleadoAsignado: String
)

data class OrdenesResponse(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("total")
    val total: Int,
    
    @SerializedName("ordenes")
    val ordenes: List<Orden>,
    
    @SerializedName("message")
    val message: String?
)

data class OrdenResponse(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("orden")
    val orden: Orden?,
    
    @SerializedName("message")
    val message: String?
)
