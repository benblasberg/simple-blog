package com.benb.blog.data;

import com.benb.blog.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByNameIgnoreCase(String name);
}
