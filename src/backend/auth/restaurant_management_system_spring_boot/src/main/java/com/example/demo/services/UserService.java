package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository urepo;

	public List<User> getAllUsers(){
		return urepo.findAll();
	}

	public User getById(int id) {
		return urepo.findById(id).get();
	}

	public User Save(User u) {
		Role r=new Role();
		r.setR_id(2);
		r.setR_name("customer");
		u.setR_id(r);
		return urepo.save(u);
	}

	public User updateUserById(int id,User userDetails) {
		Optional<User> byId = urepo.findById(id);
		if(byId.isPresent()) {
			User user = byId.get();
			user.setAadhar_no(userDetails.getAadhar_no());
			user.setAddress(userDetails.getAddress());
			user.setEmail(userDetails.getEmail());
			user.setFname(userDetails.getFname());
			user.setGender(userDetails.getGender());
			user.setLname(userDetails.getLname());
			user.setMname(userDetails.getMname());
			user.setPassword(userDetails.getPassword());
			user.setPhone_no(userDetails.getPhone_no());
			user.setProfile_photo(userDetails.getProfile_photo());
			user.setU_id(userDetails.getU_id());

			return urepo.save(user);
		}
		else {

			return null;
		}
	}

	public void deleteById(int id) {
		urepo.deleteById(id);
	}

	public User getLogin(String email,String password) {
		User u;
		Optional<User>os= urepo.getLogin(email, password);
		try {
			u=os.get();
		}
		catch(Exception e){
			u=null;
		}
		return u;
	}
	
	// UserService.java

	public boolean handleForgotPassword(String email) {
	    Optional<User> optionalUser = urepo.findByEmail(email);
	    
	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();

	        // You can generate a reset token (optional)
	        // String token = UUID.randomUUID().toString();
	        // user.setResetToken(token);
	        // userRepository.save(user);

	        // Simulate sending reset link
	        System.out.println("Sending reset email to: " + user.getEmail());
	        // You could also log the token or print dummy link like: http://localhost:8080/reset-password?token=abc123

	        return true;
	    }
	    return false;
	}


}
