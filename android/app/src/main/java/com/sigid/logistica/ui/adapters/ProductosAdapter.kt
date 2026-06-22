package com.sigid.logistica.ui.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import com.sigid.logistica.R
import com.sigid.logistica.data.models.Producto

class ProductosAdapter(
    private val onProductoClick: (Producto) -> Unit
) : ListAdapter<Producto, ProductosAdapter.ProductoViewHolder>(ProductoDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductoViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_producto, parent, false)
        return ProductoViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: ProductoViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class ProductoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val card: MaterialCardView = itemView.findViewById(R.id.card_producto)
        private val nombre: TextView = itemView.findViewById(R.id.text_nombre)
        private val precio: TextView = itemView.findViewById(R.id.text_precio)
        private val stock: TextView = itemView.findViewById(R.id.text_stock)
        private val botonAgregar: MaterialButton = itemView.findViewById(R.id.btn_agregar)
        
        fun bind(producto: Producto) {
            nombre.text = producto.nombre
            precio.text = "$${"%.0f".format(producto.precio)}"
            stock.text = "Stock: ${producto.stock}"
            
            botonAgregar.setOnClickListener {
                onProductoClick(producto)
            }
        }
    }
    
    class ProductoDiffCallback : DiffUtil.ItemCallback<Producto>() {
        override fun areItemsTheSame(oldItem: Producto, newItem: Producto): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Producto, newItem: Producto): Boolean {
            return oldItem == newItem
        }
    }
}
