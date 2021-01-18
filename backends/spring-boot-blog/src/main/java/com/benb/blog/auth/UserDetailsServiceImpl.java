package com.benb.blog.auth;

import com.benb.blog.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User.UserBuilder userBuilder = User.builder();
        com.benb.blog.model.User user = userRepository.findByNameIgnoreCase(username);
        if (user == null) {
            return null;
        }

        userBuilder.username(username);
        userBuilder.password(user.getPassword());
        userBuilder.roles("USER");

        return userBuilder.build();
    }
}
