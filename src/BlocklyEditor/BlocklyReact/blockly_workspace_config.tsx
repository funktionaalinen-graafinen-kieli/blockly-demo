interface BlocklyWsOptions {
    readOnly: boolean
    trashcan: boolean
    move: {
        scrollbars: boolean
        drag: boolean
        wheel: boolean
    }
    initialXml: string
    renderer: string
}

const initialXml = `
<xml xmlns="https://developers.google.com/blockly/xml"> <block type="funkly_entity" id="~uW[mpWpjjXM@kmZa%}T" x="0" y="0"> <field name="id">e1</field> <field name="initx">1</field> <field name="inity">1</field> <statement name="x"> <block type="funkly_add" id="g5h+8TJo=W6+TpX~b(h["> <statement name="NUMBER0"> <block type="funkly_number" id="ALF?0#[I1%YiMOFOC?)u"> <field name="NUM">1</field> </block> </statement> <statement name="NUMBER1"> <block type="funkly_get" id="qTP[PnCTb)92YdkZ_!6)"> <field name="entity">e1</field> <field name="property">x</field> </block> </statement> </block> </statement> <statement name="y"> <block type="funkly_number" id="131.[!Ger7jzm*$-tA5~"> <field name="NUM">0</field> </block> </statement> <statement name="img"> <block type="funkly_img" id="*=0X~bj(.EKEX?3i9e;!"> <field name="IMAGE">/static/media/breadoge.e7c76454.png</field> </block> </statement> </block> <block type="funkly_entity" id=":-}}?Mn(X5(V|oTq:%37" x="483" y="5"> <field name="id">e2</field> <field name="initx">1</field> <field name="inity">60</field> <statement name="x"> <block type="funkly_cond" id="BwW^UmYc}rT|TlsD].fl"> <statement name="IF"> <block type="funkly_gt" id="z8D,w62~cGh5y%5!8i4N"> <statement name="NUMBER0"> <block type="funkly_get" id="6(z[#B6E~3vDscg4_xg6"> <field name="entity">e2</field> <field name="property">x</field> </block> </statement> <statement name="NUMBER1"> <block type="funkly_number" id="J^0cl:4W$(G}l_s]8U\`p"> <field name="NUM">3000</field> </block> </statement> </block> </statement> <statement name="DO"> <block type="funkly_add" id="qEe\`i$qsg}$Y}!f+hB|B"> <statement name="NUMBER0"> <block type="funkly_number" id="Y=a8vG8=32}Yde=aUW7S"> <field name="NUM">2</field> </block> </statement> <statement name="NUMBER1"> <block type="funkly_get" id="EoCy:]).:GZ+SQ.e)WbY"> <field name="entity">e2</field> <field name="property">x</field> </block> </statement> </block> </statement> <statement name="ELSE"> <block type="funkly_get" id="f)o,1V#-A~edbQTRPL4y"> <field name="entity">e2</field> <field name="property">x</field> </block> </statement> </block> </statement> <statement name="y"> <block type="funkly_get" id=":DH0hDC@{lUMHyC4_ARp"> <field name="entity">e2</field> <field name="property">y</field> </block> </statement> <statement name="img"> <block type="funkly_img" id="5wgMAS);CGKwt-i3n!40"> <field name="IMAGE">/static/media/muscledoge.ecd737eb.png</field> </block> </statement> </block> </xml>
    `


export const BLOCKLYCONFIG: BlocklyWsOptions = {
    readOnly: false,
    trashcan: true,
    renderer: "funkly_renderer",
    move: { scrollbars: true, drag: false, wheel: true },
    initialXml: initialXml
}
