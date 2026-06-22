package com.sigid.logistica.ui.orders

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.data.model.Orden
import com.sigid.logistica.data.preferences.SessionManager

class OrdersFragment : Fragment() {
    private lateinit var viewModel: OrdersViewModel
    private lateinit var adapter: OrderAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var sessionManager: SessionManager
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_orders, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        sessionManager = SessionManager(requireContext())
        viewModel = ViewModelProvider(this)[OrdersViewModel::class.java]
        
        recyclerView = view.findViewById(R.id.recyclerViewOrders)
        adapter = OrderAdapter { order -> onOrderClick(order) }
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        
        setupObservers()
        viewModel.loadOrders()
    }
    
    private fun setupObservers() {
        viewModel.orders.observe(viewLifecycleOwner) { orders ->
            adapter.submitList(orders)
        }
        
        viewModel.isLoading.observe(viewLifecycleOwner) { isLoading ->
            // Mostrar/ocultar progressBar
        }
        
        viewModel.error.observe(viewLifecycleOwner) { error ->
            Toast.makeText(requireContext(), error, Toast.LENGTH_LONG).show()
        }
    }
    
    private fun onOrderClick(order: Orden) {
        if (sessionManager.isEmployee() && order.estado == "ASIGNADO") {
            showMarkDeliveredDialog(order)
        }
    }
    
    private fun showMarkDeliveredDialog(order: Orden) {
        AlertDialog.Builder(requireContext())
            .setTitle("Marcar como Entregada")
            .setMessage("¿Deseas marcar la orden ${order.idGuia} como entregada?")
            .setPositiveButton("Sí") { _, _ ->
                viewModel.markAsDelivered(order.id)
            }
            .setNegativeButton("No", null)
            .show()
    }
}
