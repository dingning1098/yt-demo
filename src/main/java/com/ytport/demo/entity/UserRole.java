package com.ytport.demo.entity;
// Generated 2015-2-5 13:32:04 by Hibernate Tools 4.0.0


import com.ytport.base.entity.BaseEntity;

import javax.persistence.*;

/**
 * 用户与角色关系表
 */
@Entity
@Table(name = "YTG_USER_ROLE")
public class UserRole extends BaseEntity {

    private String userId;
    private User user;
    private String roleId;
    private Role role;

    @Id
    @Column(name="USER_ID")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @ManyToOne
    @JoinColumn(name="USER_ID",insertable = false,updatable = false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @Column(name="ROLE_ID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @ManyToOne
    @JoinColumn(name="ROLE_ID",insertable = false,updatable = false)
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}


