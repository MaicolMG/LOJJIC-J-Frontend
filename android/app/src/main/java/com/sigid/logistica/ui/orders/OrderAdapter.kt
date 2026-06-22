package com.sigid.logistica.ui.orders

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.sigid.logistica.R
import com.sigid.logistica.data.model.Orden

class OrderAdapter(
    private val onOrderClick: (Orden) -> Unit
) : ListAdapter<Orden, OrderAdapter.OrderViewHolder>(OrderDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_order, parent, false)
        return OrderViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = getItem(position)
        holder.bind(order)
    }
    
    inner class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvGuideId: TextView = itemView.findViewById(R.id.tvOrderGuideId)
        private val tvStatus: TextView = itemView.findViewById(R.id.tvOrderStatus)
        private val tvRecipient: TextView = itemView.findViewById(R.id.tvOrderRecipient)
        private val tvBranch: TextView = itemView.findViewById(R.id.tvOrderBranch)
        private val tvValue: TextView = itemView.findViewById(R.id.tvOrderValue)
        private val tvEmployee: TextView = itemView.findViewById(R.id.tvOrderEmployee)
        
        fun bind(order: Orden) {
            tvGuideId.text = "Guía: ${order.idGuia}"
            tvStatus.text = "Estado: ${order.estado}"
            tvRecipient.text = "Destinatario: ${order.destinatario ?: "N/A"}"
            tvBranch.text = "Sede: ${order.sede}"
            tvValue.text = "Valor: $${order.valorDeclarado}"
            tvEmployee.text = "Empleado: ${order.empleadoAsignado ?: "Sin asignar"}"
            
            // Color según estado
            when (order.estado) {
                "ENTREGADO" -> tvStatus.setTextColor(itemView.context.getColor(R.color.success))
                "ASIGNADO" -> tvStatus.setTextColor(itemView.context.getColor(R.color.warning))
                else -> tvStatus.setTextColor(itemView.context.getColor(R.color.text_secondary))
            }
            
            itemView.setOnClickListener {
                onOrderClick(order)
            }
        }
    }
    
    class OrderDiffCallback : DiffUtil.ItemCallback<Orden>() {
        override fun areItemsTheSame(oldItem: Orden, newItem: Orden): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Orden, newItem: Orden): Boolean {
            return oldItem == newItem
        }
    }
}
