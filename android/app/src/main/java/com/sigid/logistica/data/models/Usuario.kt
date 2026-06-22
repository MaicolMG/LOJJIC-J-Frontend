package com.sigid.logistica.data.models

data class Usuario(
    val email: String,
    val nombre: String,
    val rol: String,
    val token: String? = null
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginResponse(
    val success: Boolean,
    val message: String,
    val usuario: Usuario? = null,
    val requiresMFA: Boolean = false
)

data class MFARequest(
    val email: String,
    val code: String
)
