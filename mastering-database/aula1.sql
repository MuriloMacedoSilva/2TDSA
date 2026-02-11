
-- Aula 1 - 10/02/26

-- Ativar a saida de dados
SET SERVEROUTPUT ON;

-- dasabilitar saída de variáveis
SET VERIFY OFF; 

begin 
    -- saída de dados com concatenação
    dbms_output.put_line('Marcel - '||'FIAP');
end;

begin 
    -- saída de dados sem concatenação
    dbms_output.put_line('Marcel');
end;

begin 
    -- saída de dados
    dbms_output.put_line(365);
end;

begin 
    -- saída de dados
    dbms_output.put_line(365 + 365);
end;

-- crie um programa que concatene uma string com o resultado de um processamento matematico qualquer...

-- usando variavel de memoria

declare 
    v_cod number(2) := 10;
    v_nome varchar(10) := 'FIAP';
begin 
    dbms_output.put_line(v_cod||'-'||v_nome);
end;

