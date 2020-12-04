
export default class Layout{
    constructor(id, width, height, root){
        this.id = id;
        this.width = width;
        this.height = height;
        this.ctx = null;
        this.root = root;
        this.draw = null;
        this.createLayout();
    }
    createLayout() {
        const dom = document.createElement('canvas');
        dom.width = this.width;
        dom.height = this.height;
        
        dom.style.position = 'absolute';
        dom.style.width = this.width + 'px';
        dom.style.height = this.height + 'px';

        this.ctx = dom.getContext('2d');
        
        this.root.appendChild(dom);
        return this;
    }
    clearCurrentLayout() {
        this.ctx.clearRect(0,0,this.width,this.height);
        return this;
    }
}