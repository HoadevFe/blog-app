import React from "react";
import { Link } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/280757017_2038704299645190_7931972686930481782_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=nRkPaKMf__IAX9qOXeG&_nc_ht=scontent.fdad3-1.fna&oh=00_AfAmObneEb-khq_G-ftMmkQysgk7Bs-rm_n-kJER5DCzBA&oe=6422A62E"
            alt=""
          />
          <div className="info">
            <span>CTH</span>
            <p>posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero alias
          natus facilis provident eveniet ratione magni aliquid vitae eos quis
          sapiente doloribus, totam odit recusandae dolore suscipit atque aut
          sint.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, velit
          delectus accusantium qui aut itaque facere explicabo, voluptate, ut
          atque iusto aliquid consequatur sed! Eaque non ea dolores eveniet
          earum.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, velit
          delectus accusantium qui aut itaque facere explicabo, voluptate, ut
          atque iusto aliquid consequatur sed! Eaque non ea dolores eveniet
          earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
          velit delectus accusantium qui aut itaque facere explicabo, voluptate,
          ut atque iusto aliquid consequatur sed! Eaque non ea dolores eveniet
          earum.
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
