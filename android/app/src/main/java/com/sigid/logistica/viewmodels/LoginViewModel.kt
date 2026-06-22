package com.sigid.logistica.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sigid.logistica.data.models.LoginResponse
import com.sigid.logistica.data.repository.SigidRepository
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    
    private val repository = SigidRepository()
    
    private val _loginResult = MutableLiveData<LoginResponse?>()
    val loginResult: LiveData<LoginResponse?> = _loginResult
    
    fun login(email: String, password: String) {
        viewModelScope.launch {
            val result = repository.login(email, password)
            _loginResult.postValue(result)
        }
    }
    
    fun verifyMFA(email: String, code: String) {
        viewModelScope.launch {
            val result = repository.verifyMFA(email, code)
            _loginResult.postValue(result)
        }
    }
}
