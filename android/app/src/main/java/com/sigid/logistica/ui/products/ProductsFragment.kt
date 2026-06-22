package com.sigid.logistica.ui.products

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.widget.addTextChangedListener
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputEditText
import com.sigid.logistica.R
import com.sigid.logistica.data.model.Product
import com.sigid.logistica.data.preferences.SessionManager

class ProductsFragment : Fragment() {
    private lateinit var viewModel: ProductsViewModel
    private lateinit var adapter: ProductAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var sessionManager: SessionManager
    private lateinit var etSearch: TextInputEditText
    private lateinit var fabScanner: FloatingActionButton

    private val scanLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == android.app.Activity.RESULT_OK) {
            val code = result.data?.getStringExtra("SCAN_RESULT")
            if (code != null) {
                etSearch.setText(code)
                Toast.makeText(requireContext(), "Código escaneado: $code", Toast.LENGTH_SHORT).show()
            }
        }
    }
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_products, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        sessionManager = SessionManager(requireContext())
        viewModel = ViewModelProvider(this)[ProductsViewModel::class.java]
        
        initViews(view)
        setupObservers()
        viewModel.loadProducts()
    }

    private fun initViews(view: View) {
        recyclerView = view.findViewById(R.id.recyclerViewProducts)
        etSearch = view.findViewById(R.id.etSearch)
        fabScanner = view.findViewById(R.id.fabScanner)

        adapter = ProductAdapter { product -> onProductClick(product) }
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        etSearch.addTextChangedListener { text ->
            filterProducts(text.toString())
        }

        fabScanner.setOnClickListener {
            // Aquí lanzaremos el ScannerActivity (lo crearé en el siguiente paso)
            Toast.makeText(requireContext(), "Abriendo escáner...", Toast.LENGTH_SHORT).show()
            // val intent = Intent(requireContext(), ScannerActivity::class.java)
            // scanLauncher.launch(intent)
        }
    }
    
    private fun setupObservers() {
        viewModel.products.observe(viewLifecycleOwner) { products ->
            adapter.submitList(products)
        }
        
        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            // Mostrar/ocultar progressBar
        }
        
        viewModel.error.observe(viewLifecycleOwner) { error ->
            Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show()
        }
    }

    private fun filterProducts(query: String) {
        val fullList = viewModel.products.value ?: emptyList()
        if (query.isEmpty()) {
            adapter.submitList(fullList)
        } else {
            val filteredList = fullList.filter { 
                it.nombre.contains(query, ignoreCase = true) || 
                it.sku.contains(query, ignoreCase = true)
            }
            adapter.submitList(filteredList)
        }
    }
    
    private fun onProductClick(product: Product) {
        if (sessionManager.isAdmin()) {
            // Mostrar opciones de edición/eliminación
        }
    }
}
