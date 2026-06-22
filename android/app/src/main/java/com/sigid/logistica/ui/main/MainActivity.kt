package com.sigid.logistica.ui.main

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.sigid.logistica.R
import com.sigid.logistica.data.preferences.SessionManager
import com.sigid.logistica.ui.login.LoginActivity
import com.sigid.logistica.ui.products.ProductsFragment
import com.sigid.logistica.ui.orders.OrdersFragment
import com.sigid.logistica.ui.checkout.CheckoutFragment
import com.sigid.logistica.ui.profile.ProfileFragment

class MainActivity : AppCompatActivity() {
    private lateinit var sessionManager: SessionManager
    private lateinit var bottomNavigation: BottomNavigationView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        sessionManager = SessionManager(this)
        
        // Configurar toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.title = "SIGID - ${sessionManager.getUserName()}"
        
        // Configurar navegación inferior
        bottomNavigation = findViewById(R.id.bottomNavigation)
        bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_products -> {
                    loadFragment(ProductsFragment())
                    supportActionBar?.title = "Productos"
                    true
                }
                R.id.navigation_orders -> {
                    loadFragment(OrdersFragment())
                    supportActionBar?.title = "Órdenes"
                    true
                }
                R.id.navigation_checkout -> {
                    loadFragment(CheckoutFragment())
                    supportActionBar?.title = "Crear Orden"
                    true
                }
                R.id.navigation_profile -> {
                    loadFragment(ProfileFragment())
                    supportActionBar?.title = "Perfil"
                    true
                }
                else -> false
            }
        }
        
        // Cargar fragment inicial según el rol
        loadInitialFragment()
    }
    
    private fun loadInitialFragment() {
        val (fragment, title, itemId) = when {
            sessionManager.isAdmin() -> Triple(ProductsFragment(), "Panel Administrador", R.id.navigation_products)
            sessionManager.isEmployee() -> Triple(OrdersFragment(), "Panel Empleado", R.id.navigation_orders)
            else -> Triple(ProductsFragment(), "Productos", R.id.navigation_products)
        }
        
        loadFragment(fragment)
        supportActionBar?.title = title
        bottomNavigation.selectedItemId = itemId
    }
    
    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }
    
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }
    
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_logout -> {
                showLogoutDialog()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
    
    private fun showLogoutDialog() {
        AlertDialog.Builder(this)
            .setTitle("Cerrar Sesión")
            .setMessage("¿Estás seguro de que deseas cerrar sesión?")
            .setPositiveButton("Sí") { _, _ ->
                sessionManager.clearSession()
                val intent = android.content.Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()
            }
            .setNegativeButton("No", null)
            .show()
    }
}
