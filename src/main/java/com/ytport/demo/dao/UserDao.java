package com.ytport.demo.dao;

import com.ytport.base.dao.BaseDao;
import com.ytport.demo.entity.User;
import org.springframework.stereotype.Repository;


@Repository("userDao")
public class UserDao extends BaseDao<User, String> {

}