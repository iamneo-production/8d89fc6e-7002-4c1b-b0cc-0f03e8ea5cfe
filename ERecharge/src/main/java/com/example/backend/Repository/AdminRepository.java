
package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Model.AdminModel;

public interface  AdminRepository  extends JpaRepository<AdminModel,Integer> {
	  AdminModel findByEmail(String email);

}
