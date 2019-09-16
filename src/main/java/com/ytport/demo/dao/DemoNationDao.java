package com.ytport.demo.dao;

import com.ytport.demo.entity.DemoNation;
import com.ytport.base.dao.BaseDao;
import org.springframework.stereotype.Repository;

@Repository("demoNationDao")
public class DemoNationDao extends BaseDao<DemoNation, String> {

}