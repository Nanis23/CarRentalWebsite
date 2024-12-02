package com.sinaj.Car_Rental_Spring.services.Jwt;

import com.sinaj.Car_Rental_Spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {

        return  new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username){
                return userRepository.findFirstByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException(username+" not found"));
            }
        };

    }
}
