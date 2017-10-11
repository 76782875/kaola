
export const PAGE_SIZE = 3;
export function indexof(data,id){
    for(var i=0;i<data.length;i++){
        if(data[i].id == id){
            return i;
        }
    }
    return -1;
}
export function deleteCommon(data,id){
    if(id !== 'all'){
        var index = indexof(data,id);
        if(index > -1){
            data.splice(index,1);
        }
        return data;
    }else{
        return [];
    }
}
