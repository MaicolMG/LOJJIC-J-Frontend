package com.sigid.logistica.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.button.MaterialButton
import com.sigid.logistica.R
import com.sigid.logistica.ui.adapters.CarritoAdapter
import com.sigid.logistica.viewmodels.ProductosViewModel

class CarritoFragment : Fragment() {
    
    private val viewModel: ProductosViewModel by activityViewModels()
    private lateinit var recyclerView: RecyclerView
    private lateinit var totalText: TextView
    private lateinit var procesarButton: MaterialButton
    private lateinit var adapter: CarritoAdapter
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_carrito, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        recyclerView = view.findViewById(R.id.recycler_carrito)
        totalText = view.findViewById(R.id.total_text)
        procesarButton = view.findViewById(R.id.procesar_button)
        
        recyclerView.layoutManager = LinearLayoutManager(context)
        
        adapter = CarritoAdapter { tempId ->
            viewModel.eliminarDelCarrito(tempId)
        }
        
        recyclerView.adapter = adapter
        
        viewModel.carrito.observe(viewLifecycleOwner) { carrito ->
            adapter.submitList(carrito)
            val total = viewModel.getTotalCarrito()
            totalText.text = "Total: $${"%.2f".format(total)}"
        }
    }
}
