package com.sigid.logistica.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.ui.adapters.ProductosAdapter
import com.sigid.logistica.viewmodels.ProductosViewModel

class CatalogoFragment : Fragment() {
    
    private val viewModel: ProductosViewModel by activityViewModels()
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ProductosAdapter
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_catalogo, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        recyclerView = view.findViewById(R.id.recycler_productos)
        recyclerView.layoutManager = GridLayoutManager(context, 2)
        
        adapter = ProductosAdapter { producto ->
            viewModel.agregarAlCarrito(producto)
            Toast.makeText(context, "Producto agregado", Toast.LENGTH_SHORT).show()
        }
        
        recyclerView.adapter = adapter
        
        viewModel.productos.observe(viewLifecycleOwner) { productos ->
            adapter.submitList(productos)
        }
        
        viewModel.loadProductos()
    }
}
