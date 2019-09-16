package com.ytport.demo.entity;
// Generated 2015-2-5 13:32:04 by Hibernate Tools 4.0.0


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ytport.base.entity.IdEntity;
import com.ytport.base.service.ServiceEx;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * 应用系统用户
 */
@Entity
@Table(name = "YTG_USER")
public class User extends IdEntity {

    private String name;
    private String loginName;
    private String pwd;
    private String plainPwd;//前台传过来的明文密码
    private String verifyPlainPwd;//确认明文密码
    private String email;
    private String workerCode;
    private String tel;//电话
    private String note;//备注
    private String workerInfo;//职工信息，单位+姓名
    private String salt;
    private Integer stateFlag;//0:正常，1:停用
    private String creatorId;//用户创建者ID
    private User creator;//该用户的创建者

    private Set<UserRole> userRoles = new HashSet<UserRole>(0);

    public User() {
    }


    public User(String id, String loginName, String pwd) {
        this.id = id;
        this.loginName = loginName;
        this.pwd = pwd;
    }

    @Column(name = "NAME", length = 256)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Column(name = "LOGIN_NAME", nullable = false, length = 64)
    public String getLoginName() {
        return this.loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }


    @Column(name = "PWD", nullable = false, length = 64)
    public String getPwd() {
        return this.pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Transient
    public String getPlainPwd() {
        return plainPwd;
    }

    public void setPlainPwd(String plainPwd) {
        this.plainPwd = plainPwd;
    }
    @Column(name = "EMAIL", length = 128)
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Column(name = "WORKER_CODE", length = 20)
    public String getWorkerCode() {
        return this.workerCode;
    }

    public void setWorkerCode(String workerCode) {
        this.workerCode = workerCode;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }



    @Column(name = "SALT", length = 64)
    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Column(name = "STATE_FLAG")
    public Integer getStateFlag() {
        return stateFlag;
    }

    public void setStateFlag(Integer stateFlag) {
        this.stateFlag = stateFlag;
    }

    @Column(name="CREATOR_ID")
    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="CREATOR_ID",insertable = false,updatable = false)
    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    @Transient
    public String getVerifyPlainPwd() {
        return verifyPlainPwd;
    }

    public void setVerifyPlainPwd(String verifyPlainPwd) {
        this.verifyPlainPwd = verifyPlainPwd;
    }

    @OneToMany(mappedBy = "user")
    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    @Transient
    public String getWorkerInfo() {
        return workerInfo;
    }

    public void setWorkerInfo(String workerInfo) {
        this.workerInfo = workerInfo;
    }



}


