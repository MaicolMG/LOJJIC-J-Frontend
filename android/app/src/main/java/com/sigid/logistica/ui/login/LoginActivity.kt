package com.sigid.logistica.ui.login

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.textfield.TextInputEditText
import com.sigid.logistica.R
import com.sigid.logistica.data.api.ApiClient
import com.sigid.logistica.data.preferences.SessionManager
import com.sigid.logistica.ui.main.MainActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var viewModel: LoginViewModel
    private lateinit var sessionManager: SessionManager
    
    private lateinit var etEmail: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var btnLogin: Button
    private lateinit var progressBar: ProgressBar
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        
        sessionManager = SessionManager(this)
        
        // Configurar el proveedor de token para el API client
        ApiClient.setTokenProvider { sessionManager.getToken() }
        
        // Verificar si ya está logueado
        if (sessionManager.isLoggedIn()) {
            navigateToMain()
            return
        }
        
        initViews()
        initViewModel()
    }
    
    private fun initViews() {
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        btnLogin = findViewById(R.id.btnLogin)
        progressBar = findViewById(R.id.progressBar)
        
        btnLogin.setOnClickListener {
            val email = etEmail.text?.toString() ?: ""
            val password = etPassword.text?.toString() ?: ""
            viewModel.login(email, password)
        }
    }
    
    private fun initViewModel() {
        viewModel = ViewModelProvider(this)[LoginViewModel::class.java]
        
        viewModel.loginResult.observe(this) { result ->
            when (result) {
                is LoginResult.Success -> {
                    val authResponse = result.authResponse
                    authResponse.token?.let { sessionManager.saveAuthToken(it) }
                    authResponse.user?.let { user ->
                        sessionManager.saveUser(user.id, user.nombre, user.email, user.rol)
                    }
                    navigateToMain()
                }
                is LoginResult.Error -> {
                    Toast.makeText(this, result.message, Toast.LENGTH_LONG).show()
                }
            }
        }
        
        viewModel.isLoading.observe(this) { isLoading ->
            progressBar.visibility = if (isLoading) android.view.View.VISIBLE else android.view.View.GONE
            btnLogin.isEnabled = !isLoading
        }
    }
    
    private fun navigateToMain() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}
