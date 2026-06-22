package com.sigid.logistica.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.api.ApiClient
import com.sigid.logistica.data.api.AuthService
import com.sigid.logistica.data.model.AuthResponse
import com.sigid.logistica.data.model.LoginRequest
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    private val authService: AuthService = ApiClient.createAuthService()
    
    private val _loginResult = MutableLiveData<LoginResult>()
    val loginResult: LiveData<LoginResult> = _loginResult
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            _loginResult.value = LoginResult.Error("Email y contraseña son requeridos")
            return
        }
        
        _isLoading.value = true
        
        viewModelScope.launch {
            try {
                val request = LoginRequest(email, password)
                val response = authService.login(request)
                
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    if (authResponse.success && authResponse.token != null && authResponse.user != null) {
                        _loginResult.value = LoginResult.Success(authResponse)
                    } else {
                        _loginResult.value = LoginResult.Error(authResponse.message ?: "Error en el login")
                    }
                } else {
                    _loginResult.value = LoginResult.Error("Error de conexión con el servidor")
                }
            } catch (e: Exception) {
                _loginResult.value = LoginResult.Error("Error de red: ${e.message}")
            } finally {
                _isLoading.value = false
            }
        }
    }
}

sealed class LoginResult {
    data class Success(val authResponse: AuthResponse) : LoginResult()
    data class Error(val message: String) : LoginResult()
}
