package com.sigid.logistica.ui.checkout

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.data.model.OrderItem
import com.sigid.logistica.data.model.Product

class CheckoutFragment : Fragment() {
    private lateinit var viewModel: CheckoutViewModel
    private lateinit var productAdapter: ProductSelectionAdapter
    private lateinit var cartAdapter: CartAdapter
    private lateinit var recyclerViewProducts: RecyclerView
    private lateinit var recyclerViewCart: RecyclerView
    
    private lateinit var etSede: EditText
    private lateinit var etMetodoPago: EditText
    private lateinit var etDestinatario: EditText
    private lateinit var tvTotal: TextView
    private lateinit var btnCreateOrder: Button
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_checkout, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        viewModel = ViewModelProvider(this)[CheckoutViewModel::class.java]
        
        recyclerViewProducts = view.findViewById(R.id.recyclerViewProducts)
        recyclerViewCart = view.findViewById(R.id.recyclerViewCart)
        etSede = view.findViewById(R.id.etSede)
        etMetodoPago = view.findViewById(R.id.etMetodoPago)
        etDestinatario = view.findViewById(R.id.etDestinatario)
        tvTotal = view.findViewById(R.id.tvTotal)
        btnCreateOrder = view.findViewById(R.id.btnCreateOrder)
        
        setupProductRecyclerView()
        setupCartRecyclerView()
        setupObservers()
        
        btnCreateOrder.setOnClickListener {
            createOrder()
        }
    }
    
    private fun setupProductRecyclerView() {
        productAdapter = ProductSelectionAdapter { product -> viewModel.addToCart(product) }
        recyclerViewProducts.adapter = productAdapter
        recyclerViewProducts.layoutManager = LinearLayoutManager(requireContext())
    }
    
    private fun setupCartRecyclerView() {
        cartAdapter = CartAdapter { position -> viewModel.removeFromCart(position) }
        recyclerViewCart.adapter = cartAdapter
        recyclerViewCart.layoutManager = LinearLayoutManager(requireContext())
    }
    
    private fun setupObservers() {
        viewModel.products.observe(viewLifecycleOwner) { products ->
            productAdapter.submitList(products)
        }
        
        viewModel.cartItems.observe(viewLifecycleOwner) { items ->
            cartAdapter.submitList(items)
            tvTotal.text = "Total: $${viewModel.getTotal()}"
        }
        
        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            btnCreateOrder.isEnabled = !isLoading
        }
        
        viewModel.error.observe(viewLifecycleOwner) { error ->
            Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show()
        }
        
        viewModel.orderCreated.observe(viewLifecycleOwner) { created ->
            if (created) {
                Toast.makeText(requireContext(), "Orden creada exitosamente", Toast.LENGTH_LONG).show()
                clearForm()
            }
        }
    }
    
    private fun createOrder() {
        val sede = etSede.text?.toString() ?: ""
        val metodoPago = etMetodoPago.text?.toString() ?: ""
        val destinatario = etDestinatario.text?.toString()
        
        if (sede.isBlank() || metodoPago.isBlank()) {
            Toast.makeText(requireContext(), "Sede y método de pago son requeridos", Toast.LENGTH_SHORT).show()
            return
        }
        
        viewModel.createOrder(sede, metodoPago, destinatario)
    }
    
    private fun clearForm() {
        etSede.text?.clear()
        etMetodoPago.text?.clear()
        etDestinatario.text?.clear()
    }
}
