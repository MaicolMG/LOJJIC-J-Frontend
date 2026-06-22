package com.sigid.logistica.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object ApiClient {
    private const val BASE_URL = "http://192.168.137.81:5000/" // Para dispositivo físico Honor X8b
    // Para dispositivo físico: usar la IP de tu computadora, ej: "http://192.168.1.100:5000/"
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }
    
    private var tokenProvider: (() -> String?)? = null
    
    fun setTokenProvider(provider: () -> String?) {
        tokenProvider = provider
    }
    
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor(AuthInterceptor { tokenProvider?.invoke() })
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
    
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    
    fun <T> createService(serviceClass: Class<T>): T {
        return retrofit.create(serviceClass)
    }
    
    fun createAuthService(): AuthService {
        return createService(AuthService::class.java)
    }
    
    fun createProductService(): ProductService {
        return createService(ProductService::class.java)
    }
    
    fun createOrdenService(): OrdenService {
        return createService(OrdenService::class.java)
    }
}
