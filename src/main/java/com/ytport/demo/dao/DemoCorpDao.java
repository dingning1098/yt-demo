package com.ytport.demo.dao;

import com.ytport.demo.entity.DemoCorp;
import com.ytport.base.dao.BaseDao;
import org.springframework.stereotype.Repository;

@Repository("demoCorpDao")
public class DemoCorpDao extends BaseDao<DemoCorp, String> {

}