import React, { Component } from 'react';
import { Image,  } from 'react-native';

class Ovni extends Component {

    colidiuCom(outro) {
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro) {
           this.animacao.excluirSprite(this);
           this.colisor.excluirSprite(this);
           this.animacao.excluirSprite(outro);
           this.colisor.excluirSprite(outro);
           
           var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
           this.animacao.novoSprite(explosao);
        }
     }

    retangulosColisao() {
        // Estes valores vão sendo ajustados aos poucos
        var rets = 
        [ 
           {x: this.x+20, y: this.y+1, largura: 25, altura: 10},
           {x: this.x+2, y: this.y+11, largura: 60, altura: 12},
           {x: this.x+20, y: this.y+23, largura: 25, altura: 7},
        ];
        
        // Desenhando os retângulos para visualização | Comentar após realizar modificações
        var ctx = this.context;
        
        for (var i in rets) {
           ctx.save();
           ctx.strokeStyle = 'yellow';
           ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
                          rets[i].altura);
           ctx.restore();
        }
        return rets;
    }

    desenhar() {
        let ctx = this.context;
        let img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);

    }

    atualizar() {
        this.y += 
        this.velocidade * this.animacao.decorrido / 1000;
      
        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            context: props.context,
            imagem: props.imagem,
            x: 0,
            y: 0,
            velocidade: 0,
            imgExplosao: props.imgExplosao,
            // left: props.left,
        }
    }
    render() {
        return (
            <Image
                style={{ position: 'absolute', top: 0, left: this.state.left }}
                source={require('../../assets/images/ovni.png')}
            />
        );
    }
}

export default Ovni;
