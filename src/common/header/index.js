import React, { Component }from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { actionCreators } from './store';
import { IconFontStyle } from '../../statics/iconfont/iconfont';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    NavSearch,
    Addition,
    Button
} from './style';

class Header extends Component {
    getListArea (){
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];

        if(newList.length){
            for(let i = (page - 1) * 10; i < page * 10; i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem> 
                );
            }
        }
      
        if(focused || mouseIn){
            return (
                <SearchInfo 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                     <SearchInfoTitle>
                     热门搜索
                     <IconFontStyle />
                         <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                         <span ref={(icon) => {this.spinIcon = icon}} class="iconfont spin">&#59475;</span>
                            换一批
                         </SearchInfoSwitch>
                     </SearchInfoTitle>    
                         <SearchInfoList>
                             {pageList}
                        </SearchInfoList>                                             
                </SearchInfo>
            )
        }else {
            return null;
        }
    }

    render(){
        const { focused, handleInputFocus, handleInputBlur } = this.props;
        return(
            <HeaderWrapper>
                <IconFontStyle />
                <Logo />
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                     <span class="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <Transition
                           in={focused}
                           timeout={200}
                           classNames="slide"
                        >
                            <NavSearch 
                            className={focused ? 'focused' : ''}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            ></NavSearch>
                        </Transition>
                        <span className={focused ? 'focused iconfont zoom'  : 'iconfont zoom'}>&#xe612;</span>
                        {this.getListArea()}
                    </SearchWrapper>              
                </Nav>
                <Addition>

                    <Button className='writting'>
                        <span class="iconfont" >&#xe642;</span>
                        写文章
                        </Button>
                    <Button className='reg'>注册</Button>
                </Addition>

            </HeaderWrapper>
        )

    }
} 


const mapStateToProps = (state) => {
    return {
        // 老版本
        // focused: state.getIn(['header', 'focused']),
        // list: state.getIn(['header', 'list'])
        
        // 新版本
        focused: state.header.getIn(['focused']),
        list: state.header.getIn(['list']),
        page: state.header.getIn(['page']),
        totalPage: state.header.getIn(['totalPage']),
        mouseIn: state.header.getIn(['mouseIn'])
    }
}

const mapDispathToProps = (dispath) => {
    return {
        handleInputFocus(){
            dispath(actionCreators.getList());
            dispath(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispath(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispath(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispath(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if(originAngle){
                originAngle = parseInt(originAngle, 10);
            }else{
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
            if(page < totalPage){
                dispath(actionCreators.changePage(page + 1));
            }else {
                dispath(actionCreators.changePage(1));
            }
        }
        
    }
}
export default connect(mapStateToProps, mapDispathToProps)(Header);