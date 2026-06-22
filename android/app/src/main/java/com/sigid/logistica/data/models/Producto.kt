package com.sigid.logistica.data.models

import com.google.gson.annotations.SerializedName

data class Producto(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("nombre")
    val nombre: String,
    
    @SerializedName("precio")
    val precio: Double,
    
    @SerializedName("cat")
    val categoria: String,
    
    @SerializedName("img")
    val imagenUrl: String,
    
    @SerializedName("detalles")
    val detalles: String,
    
    @SerializedName("stock")
    val stock: Int
)

data class ProductoCarrito(
    val producto: Producto,
    var cantidad: Int = 1,
    val tempId: String = System.currentTimeMillis().toString()
)
