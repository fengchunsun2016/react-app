import React,{Component} from 'react';
import {getList} from '../../../fetch/home';
import ListComponent from '../../../components/listComponent/index';
import LoadMore from '../../../components/LoadMore/index';


export default class List extends Component{
    constructor(){
        super();
        this.state = {
            hasMore:true,
            data:[],
            page:0,
            isLoading:true
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.data.length?<ListComponent data={this.state.data} />:<div>正在加载。。。</div>
                }

                <LoadMore hasMore={this.state.hasMore} loadMore={this.loadMore.bind(this)} isLoading={this.state.isLoading} />
            </div>
        )
    }
    componentDidMount(){
        this.processData(getList(this.props.cityName,0))

    }
    loadMore(){
        this.setState({
            page:this.state.page+1,
            isLoading:true
        },()=>{
            this.processData(getList(this.props.cityName,this.state.page))
        })
    }

    processData(result){
        result.then(res=>res.json()).then(({hasMore,data})=>{
            /*console.log(data);*/
            this.setState({
                hasMore,
                data:this.state.data.concat(data),
                isLoading:false
            })
        })
    }
}
