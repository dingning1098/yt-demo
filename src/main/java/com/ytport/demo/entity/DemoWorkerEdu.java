package com.ytport.demo.entity;
// Generated 2017-5-9 14:14:01 by Hibernate Tools 4.0.0


import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.ytport.base.entity.IdEntity;

/**
 * DemoWorkerEdu generated by hbm2java
 */
@Entity
@Table(name="DEMO_WORKER_EDU")
public class DemoWorkerEdu  extends IdEntity {

             
    private String workerId;
             
    private Date bgnDte;
             
    private Date endDte;
             
    private String eduNam;
             
    private String schoolNam;
             
    private String note;

    public DemoWorkerEdu() {
    }

	
    public DemoWorkerEdu(String id, String workerId) {
        this.id = id;
        this.workerId = workerId;
    }
   

    
    @Column(name="WORKER_ID", nullable=false, length=32)
    public String getWorkerId() {
        return this.workerId;
    }
    
    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    
    @Column(name="BGN_DTE", length=7)
    public Date getBgnDte() {
        return this.bgnDte;
    }
    
    public void setBgnDte(Date bgnDte) {
        this.bgnDte = bgnDte;
    }

    
    @Column(name="END_DTE", length=7)
    public Date getEndDte() {
        return this.endDte;
    }
    
    public void setEndDte(Date endDte) {
        this.endDte = endDte;
    }

    
    @Column(name="EDU_NAM", length=32)
    public String getEduNam() {
        return this.eduNam;
    }
    
    public void setEduNam(String eduNam) {
        this.eduNam = eduNam;
    }

    
    @Column(name="SCHOOL_NAM", length=64)
    public String getSchoolNam() {
        return this.schoolNam;
    }
    
    public void setSchoolNam(String schoolNam) {
        this.schoolNam = schoolNam;
    }

    
    @Column(name="NOTE", length=128)
    public String getNote() {
        return this.note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }




}


