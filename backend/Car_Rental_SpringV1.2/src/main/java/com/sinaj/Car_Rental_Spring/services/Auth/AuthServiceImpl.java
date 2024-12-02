package com.sinaj.Car_Rental_Spring.services.Auth;

import com.sinaj.Car_Rental_Spring.dto.SignupRequest;
import com.sinaj.Car_Rental_Spring.dto.UserDTO;
import com.sinaj.Car_Rental_Spring.entity.User;
import com.sinaj.Car_Rental_Spring.enums.UserRole;
import com.sinaj.Car_Rental_Spring.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount(){
        User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);

        if (adminAccount== null){
            User newAdminAccount = new User();

            newAdminAccount.setName("AdminTest");
            newAdminAccount.setEmail("admin123@gmail.com");
            newAdminAccount.setPassword(new BCryptPasswordEncoder().encode("admin12345"));
            newAdminAccount.setUserRole(UserRole.ADMIN);

            userRepository.save(newAdminAccount);

            System.out.println("Admin account created successfully");
        }
    }

    @Override
    public UserDTO createCustomer(SignupRequest signupRequest) {
        User user = new User();

        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));

        user.setUserRole(UserRole.CUSTOMER);
        User createUser= userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createUser.getId());
        return userDTO;
    }

    @Override
    public boolean customerEmailExists(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
