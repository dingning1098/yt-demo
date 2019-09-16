package com.ytport.demo.entity;
// Generated 2015-2-5 13:32:04 by Hibernate Tools 4.0.0


import com.ytport.base.entity.IdEntity;
import org.apache.commons.lang3.StringUtils;
import org.springside.modules.utils.Collections3;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 应用系统角色
 */
@Entity
@Table(name = "YTG_ROLE")
public class Role extends IdEntity {

    private String projectCode;
    private String name;
    private String note;
    private String code;
    private Set<RoleResource> roleResources =  new HashSet<RoleResource>(0);

    public Role() {
    }


    public Role(String id) {
        this.id = id;
    }

    @Column(name = "PROJECT_CODE", length = 64)
    public String getProjectCode() {
        return this.projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    @Column(name = "NAME", length = 128)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Column(name = "NOTE", length = 1000)
    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }


    @Column(name = "CODE", length = 64)
    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST,mappedBy = "role")
    public Set<RoleResource> getRoleResources() {
        return this.roleResources;
    }

    public void setRoleResources(Set<RoleResource> roleResources) {
        this.roleResources = roleResources;
    }

    private String resourcesId;
    @Transient
    public String getResourcesId() {
        if(StringUtils.isEmpty(resourcesId))
            return Collections3.extractToString(roleResources,"resourceId",",");
        else
            return resourcesId;
    }

    public void setResourcesId(String resourcesId) {
        this.resourcesId = resourcesId;
    }

    @Transient
    public String getResourcesName(){
        List resources= Collections3.extractToList(roleResources,"resource");
        return Collections3.extractToString(resources,"name",",");
    }
}


