package com.ytport.demo.entity;
// Generated 2015-2-5 13:32:04 by Hibernate Tools 4.0.0


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ytport.base.entity.IdEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * 应用系统资源
 */
@Entity
@Table(name = "YTG_RESOURCE")
public class Resource extends IdEntity {

    private String parentId;
    private Resource parent;
    private String projectCode;
    private String name;
    private String code;
    private Integer typeFlag;
    private Integer levelCode;//资源在树结构中的层次级别，从1开始，目前最高4级
    private String note;
    private String url;
    private String origin;//资源来源，非序列化到库中的数据，标识资源所来源于的角色
    private Integer sort;
    private String iconCls;

    private Set<Resource> children = new LinkedHashSet<Resource>(0);

    public Resource() {
    }


    public Resource(String id) {
        this.id = id;
    }

    @Column(name = "PARENT_ID", insertable = true, updatable = true)
    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID", insertable = false, updatable = false)
    @JsonBackReference
    public Resource getParent() {
        return this.parent;
    }

    public void setParent(Resource parent) {
        this.parent = parent;
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


    @Column(name = "CODE", length = 128)
    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }


    @Column(name = "TYPE_FLAG", precision = 1, scale = 0)
    public Integer getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(Integer typeFlag) {
        this.typeFlag = typeFlag;
    }


    @Column(name = "LEVEL_CODE", precision = 1, scale = 0)
    public Integer getLevelCode() {
        return this.levelCode;
    }

    public void setLevelCode(Integer levelCode) {
        this.levelCode = levelCode;
    }


    @Column(name = "NOTE", length = 1000)
    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Column(name = "URL", length = 512)
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    @OrderBy("sort")
    @JsonManagedReference
    public Set<Resource> getChildren() {
        return this.children;
    }

    public void setChildren(Set<Resource> children) {
        this.children = children;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    @Transient
    public String getState() {
        if (children != null && children.size() != 0)
            return "open";
        else
            return "";
    }

    @Transient
    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}


