package com.sigid.logistica.data.model

import com.google.gson.annotations.SerializedName

data class Product(
    @SerializedName("_id")
    val id: String,
    
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("precio")
    val precio: Double,
    
    @SerializedName("stock")
    val stock: Int,
    
    @SerializedName("ubicacion")
    val ubicacion: String,
    
    @SerializedName("categoria")
    val categoria: String?,
    
    @SerializedName("imagen")
    val imagen: String?,
    
    @SerializedName("sku")
    val sku: String,
    
    @SerializedName("createdAt")
    val createdAt: String?
)

data class ProductRequest(
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("precio")
    val precio: Double,
    
    @SerializedName("stock")
    val stock: Int,
    
    @SerializedName("ubicacion")
    val ubicacion: String,
    
    @SerializedName("categoria")
    val categoria: String?,
    
    @SerializedName("imagen")
    val imagen: String?,
    
    @SerializedName("sku")
    val sku: String
)

data class ProductsResponse(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("total")
    val total: Int,
    
    @SerializedName("productos")
    val productos: List<Product>,
    
    @SerializedName("message")
    val message: String?
)

data class ProductResponse(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("producto")
    val producto: Product?,
    
    @SerializedName("message")
    val message: String?
)

data class StockAdjustRequest(
    @SerializedName("delta")
    val delta: Int
)
