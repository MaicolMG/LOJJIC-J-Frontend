package com.sigid.logistica.data.models

data class Guia(
    val id_guia: String,
    val fecha_emision: String,
    val total_activos: Int,
    val valor_declarado: Double,
    val estado: String,
    val sede_origen: String,
    val items: List<Producto>
)

data class GuiaRequest(
    val items: List<Int>,
    val sede_origen: String,
    val metodo_pago: String
)
