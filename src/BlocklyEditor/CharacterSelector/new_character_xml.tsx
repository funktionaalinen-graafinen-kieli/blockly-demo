export const entityBaseXml = (entityId: string, entity_type: string) => {
    if (entity_type === "TIETOVEKOTIN") {
        return `<xml xmlns="https://developers.google.com/blockly/xml">
                    <block type="funkly_guientity" id="${entityId}" x="420" y="239">
                        <field name="name">nimi</field>
                        <field name="initx">1</field>
                        <field name="inity">1</field>
                        <field name="width">60</field>
                        <field name="height">60</field>
                        <field name="radius">60</field>
                        <statement name="x">
                        <shadow type="funkly_get" >
                                <field name="entity">${entityId}</field>
                                <field name="property">x</field>
                            </shadow>
                        </statement>
                        <statement name="y">
                            <shadow type="funkly_get" >
                                <field name="entity">${entityId}</field>
                                <field name="property">y</field>
                            </shadow>
                        </statement>
                        <statement name="img">
                            <shadow type="funkly_img" >
                                <field name="IMAGE">actual_pisteet_tyhja_address</field>
                            </shadow>
                        </statement>
                    </block>
                </xml>`
    }
    return `<xml xmlns="https://developers.google.com/blockly/xml">
                <block type="funkly_entity" id="${entityId}" x="420" y="239">
                    <field name="name">nimi</field>
                    <field name="initx">1</field>
                    <field name="inity">1</field>
                    <field name="width">60</field>
                    <field name="height">60</field>
                    <field name="radius">60</field>
                    <statement name="x">
                        <shadow type="funkly_get" >
                            <field name="entity">${entityId}</field>
                            <field name="property">x</field>
                        </shadow>
                    </statement>
                    <statement name="y">
                        <shadow type="funkly_get" >
                            <field name="entity">${entityId}</field>
                            <field name="property">y</field>
                        </shadow>
                    </statement>
                    <statement name="img">
                    <shadow type="funkly_img" >
                        <field name="IMAGE">/static/media/default_image.a25c40e5.png</field>
                    </shadow>
                    </statement>
                </block>
            </xml>`
}

