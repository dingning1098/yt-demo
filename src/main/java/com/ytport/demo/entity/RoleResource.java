package com.ytport.demo.entity;
// Generated 2015-2-5 13:32:04 by Hibernate Tools 4.0.0


import com.ytport.base.entity.BaseEntity;

import javax.persistence.*;

/**
 * 角色与资源关系表
 */
@Entity
@Table(name = "YTG_ROLE_RESOURCE")
public class RoleResource extends BaseEntity {

    private String roleId;
    private Role role;
    private String resourceId;
    private Resource resource;

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

    @Id
    @Column(name="RESOURCE_ID")
    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    @ManyToOne
    @JoinColumn(name="RESOURCE_ID",insertable = false,updatable = false)
    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

}


