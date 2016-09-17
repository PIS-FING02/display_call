/*
               File: About
        Description: About
             Author: GeneXus Java Generator version 9_0_4-073
       Generated on: September 29, 2015 15:54:55.85
       Program type: Main program
          Main DBMS: postgresql
*/
{gxsetDateFormat( "DMY" );
gxsetTimeFormat( 24 );
gxsetFirstYearCentury( 40 );
this.gxDecPoint =  "." ;
this.gxThSep =  "," ;}
 bGXAutoskip = false;
this._SetStandaloneVars=function()
{
   AV18ParCod = GXgetIntegerValue("_PARCOD")
   A239ParCod = GXgetIntegerValue("PARCOD")
   A417ParVer = GXgetControlValue("PARVERSION")
}
this._about=function()
{
}
this._init=function()
{
}
_GXValidFnc = new Array();
this._GXLastCtrlId =13;
_GXValidFnc[13]={lvl:0,grid:0,fnc:null,fld:"_NAYUDA",gxvar:"AV9nAyuda",op:[],ip:[],nacdep:[],v2v:function(Value){AV9nAyuda=Value},v2c:function(){GXsetControlValue("_NAYUDA",AV9nAyuda,0)},c2v:function(){AV9nAyuda=GXgetControlValue("_NAYUDA")}};
this.AV9nAyuda=0;
_SetStandaloneVars( ) ;
