package com.sigid.logistica.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.sigid.logistica.R
import com.sigid.logistica.data.preferences.SessionManager

class ProfileFragment : Fragment() {
    private lateinit var sessionManager: SessionManager
    
    private lateinit var tvName: TextView
    private lateinit var tvEmail: TextView
    private lateinit var tvRole: TextView
    private lateinit var tvUserId: TextView
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        sessionManager = SessionManager(requireContext())
        
        tvName = view.findViewById(R.id.tvProfileName)
        tvEmail = view.findViewById(R.id.tvProfileEmail)
        tvRole = view.findViewById(R.id.tvProfileRole)
        tvUserId = view.findViewById(R.id.tvProfileUserId)
        
        loadUserInfo()
    }
    
    private fun loadUserInfo() {
        tvName.text = sessionManager.getUserName() ?: "N/A"
        tvEmail.text = sessionManager.getUserEmail() ?: "N/A"
        tvRole.text = sessionManager.getUserRole() ?: "N/A"
        tvUserId.text = sessionManager.getUserId() ?: "N/A"
    }
}
