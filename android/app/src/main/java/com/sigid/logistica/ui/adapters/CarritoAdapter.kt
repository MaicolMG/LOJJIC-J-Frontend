package com.sigid.logistica.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.button.MaterialButton
import com.sigid.logistica.R
import com.sigid.logistica.data.models.ProductoCarrito

class CarritoAdapter(
    private val onEliminarClick: (String) -> Unit
) : ListAdapter<ProductoCarrito, CarritoAdapter.CarritoViewHolder>(CarritoDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CarritoViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_carrito, parent, false)
        return CarritoViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: CarritoViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class CarritoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val nombre: TextView = itemView.findViewById(R.id.text_nombre_carrito)
        private val precio: TextView = itemView.findViewById(R.id.text_precio_carrito)
        private val cantidad: TextView = itemView.findViewById(R.id.text_cantidad)
        private val botonEliminar: MaterialButton = itemView.findViewById(R.id.btn_eliminar)
        
        fun bind(item: ProductoCarrito) {
            nombre.text = item.producto.nombre
            precio.text = "$${"%.0f".format(item.producto.precio)}"
            cantidad.text = "Cantidad: ${item.cantidad}"
            
            botonEliminar.setOnClickListener {
                onEliminarClick(item.tempId)
            }
        }
    }
    
    class CarritoDiffCallback : DiffUtil.ItemCallback<ProductoCarrito>() {
        override fun areItemsTheSame(oldItem: ProductoCarrito, newItem: ProductoCarrito): Boolean {
            return oldItem.tempId == newItem.tempId
        }
        
        override fun areContentsTheSame(oldItem: ProductoCarrito, newItem: ProductoCarrito): Boolean {
            return oldItem == newItem
        }
    }
}
