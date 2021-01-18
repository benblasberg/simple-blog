package com.benb.blog.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue
    private long id;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
}
