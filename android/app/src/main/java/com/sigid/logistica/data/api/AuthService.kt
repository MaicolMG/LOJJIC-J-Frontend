package com.sigid.logistica.data.api

import com.sigid.logistica.data.model.AuthResponse
import com.sigid.logistica.data.model.LoginRequest
import com.sigid.logistica.data.model.RegisterRequest
import com.sigid.logistica.data.model.User
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface AuthService {
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
    
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>
    
    @GET("api/auth/me")
    suspend fun getMe(): Response<AuthResponse>
}
